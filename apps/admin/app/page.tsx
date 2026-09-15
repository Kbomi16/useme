import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import Logo from "@/components/common/Logo"

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1>
              <Logo className="h-10" alt="useMe Admin" />
            </h1>
          </CardTitle>
          <CardDescription>
            운영 콘솔 골격입니다. 지금은 최소 화면만 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button type="button" disabled>
            시작 안내
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
