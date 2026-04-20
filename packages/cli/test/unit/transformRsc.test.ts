import { Project } from "ts-morph"
import { describe, expect, it } from "vitest"
import { ProjectInfo } from "@/utils/getProjectInfo"
import { transformRsc } from "@/utils/transformers/transformRsc"

const project = new Project({
	useInMemoryFileSystem: true,
})

describe("transform rsc", () => {
	it("should remove all NextJS specific tags when correct input is given", () => {
		const content = `import { Button } from "@/registry/ui/button";
import { Input } from "@/registry/ui/input";
import { Password } from "@/registry/ui/password";
import Link from "next/link";
import Image from "next/image";
import { GoogleIcon } from "@/app/registry/view-blocks/signin-01/components/GoogleIcon";
import { GithubIcon } from "@/app/registry/view-blocks/signin-01/components/GithubIcon";
import { Divider } from "@/registry/ui/divider";

export default function Page() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-bg -level1 px-5">
      <div className="w-200 flex rounded-2xl border border-border bg-bg -base">
        <div className="flex-1 px-8 py-10 flex flex-col gap-6">
          <div>
            <Image
              src="/signin-01/Logo.svg"
              height={32}
              width={32}
              alt="Logo"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <h1 className="text-text text-2xl font-bold antialiased">
              Sign In
            </h1>
            <p>
              Don&apos;t have an account?{" "}
              <Link href="#" className="text-primary">
                Sign Up
              </Link>
            </p>
          </div>
          <div className="flex gap-5 flex-col">
            <Input label="Email Address" />
            <Password label="Password" size="36" />
            <Button className="w-full">Sign In</Button>
          </div>
          <div className="flex gap-1.5 items-center">
            <Divider />
            <span className="text-text-tertiary text-sm whitespace-nowrap font-medium">
              Or continue with
            </span>
            <Divider />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              color="neutral"
              className="w-full text-text-secondary"
            >
              <GoogleIcon />
              Google
            </Button>
            <Button
              variant="outline"
              color="neutral"
              className="w-full text-text-secondary"
            >
              <GithubIcon />
              Github
            </Button>
          </div>
        </div>
        <div className="w-100 hidden lg:block">
          <Image
            className="h-full w-full rounded-r-2xl"
            src="/signin-01/bg.png"
            alt="Background Image"
            width={400}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
`
		const sourceFile = project.createSourceFile("temp.tsx", content)

		const projectInfo: ProjectInfo = {
			hasSrcDir: true,
			framework: {
				name: "vite",
				label: "",
				link: {
					installation: "",
					tailwind: "",
				},
			},
			isRSC: false,
			aliasPrefix: "@",
			isTsx: true,
			tailwindConfigFile: null,
			tailwindCssFile: "globals.css",
		}

		expect(
			transformRsc({ sourceFile: sourceFile, projectInfo })
		).toMatchSnapshot()
	})
})
