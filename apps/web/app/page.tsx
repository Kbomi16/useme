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
              <Logo className="h-10" />
            </h1>
          </CardTitle>
          <CardDescription>
            토이프로젝트를 어필 카드로 바꿔 공유하고, 사람들이 직접 써 보고
            피드백하는 플랫폼
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-muted-foreground text-sm">
            공개 플랫폼 골격입니다. 기능은 다음 작업에서 붙입니다.
          </p>
          <Button type="button" disabled>
            시작 안내
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
