import { getPackageVersion } from "@/lib/getPackageInfo";
import { Badge } from "@/registry/ui/badge";

export default function VersionDisplay() {
  const version = getPackageVersion();

  return (
    <div className="hidden items-center justify-center md:flex">
      <Badge className="body-xs" size="24">
        Version {version}
      </Badge>
    </div>
  );
}
