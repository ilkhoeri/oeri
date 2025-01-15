import { Input } from "@/ui/input"
import { Label } from "@/ui/label"

export function Demo() {
  return (
    <div className="flex items-center space-x-2">
      <Input id="terms" type="checkbox" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
