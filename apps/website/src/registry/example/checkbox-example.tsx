"use client";

import { HeartCrack } from "lucide-react";
import { Checkbox, CheckboxGroup } from "../ui/checkbox";

function CheckboxExample() {
  return (
    <div>
      <div className="my-4 flex gap-4">
        <Checkbox size="sm" defaultChecked>
          Option 1
        </Checkbox>

        <Checkbox size="md" defaultChecked>
          Option 2
        </Checkbox>

        <Checkbox icon={<HeartCrack />} size="lg" defaultChecked disabled>
          Option 3
        </Checkbox>
      </div>
      <div className="my-4">
        <CheckboxGroup
          size="lg"
          defaultValue={["1", "4"]}
          label="Select Options"
          className="max-w-[400px]"
        >
          <Checkbox value="1">Option 1</Checkbox>
          <Checkbox value="2">Option 2</Checkbox>
          <Checkbox value="3">Option 3</Checkbox>
          <Checkbox value="4" disabled>
            Option 4 (Disabled)
          </Checkbox>
        </CheckboxGroup>
      </div>
    </div>
  );
}

export default CheckboxExample;
