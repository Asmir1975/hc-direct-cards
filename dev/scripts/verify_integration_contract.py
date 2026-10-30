"""Check adapter key references against exact integration source; no appliance access."""
import ast,json,re,sys
from pathlib import Path
root=Path(__file__).resolve().parents[2]
if len(sys.argv) not in (2,3): raise SystemExit("Usage: python3 dev/scripts/verify_integration_contract.py /path/to/homeconnect_direct [audit.json]")
src=Path(sys.argv[1])/"custom_components/homeconnect_ws"
patterns=[]
for p in [*(src/"entity_descriptions").glob("*.py"),src/"binary_sensor.py"]:
 for n in ast.walk(ast.parse(p.read_text())):
  if isinstance(n,ast.keyword) and n.arg=="key":
   v=n.value
   if isinstance(v,ast.Constant) and isinstance(v.value,str):patterns.append(re.escape(v.value))
   elif isinstance(v,ast.JoinedStr):patterns.append("".join(re.escape(x.value) if isinstance(x,ast.Constant) else r".+" for x in v.values))
patterns+=["sensor_water_tank","sensor_bean_container","sensor_pomace_container"]
adapter=(root/"src/helpers/homeconnect-direct.ts").read_text()
decoder=json.JSONDecoder();keys=set()
for label in ("const common:","const specific:"):
 start=adapter.index("{",adapter.index(label))
 data,_=decoder.raw_decode(adapter[start:])
 dictionaries=[data] if label=="const common:" else list(data.values())
 for mapping in dictionaries:
  for values in mapping.values():keys.update(values)
audit=[dict(key=k,exists_in_exact_release_source=any(re.fullmatch(p,k.replace("{cavity}","1")) for p in patterns)) for k in sorted(keys)]
assert all(x["exists_in_exact_release_source"] for x in audit),[x for x in audit if not x["exists_in_exact_release_source"]]
if len(sys.argv)==3:Path(sys.argv[2]).write_text(json.dumps(audit,indent=2))
print("Verified exact-release descriptor key references:",len(audit))
