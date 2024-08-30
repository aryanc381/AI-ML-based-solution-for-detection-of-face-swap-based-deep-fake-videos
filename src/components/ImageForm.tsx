import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ImageFormProps } from "@/interfaces"


export function ImageForm({submitForm}: ImageFormProps) {
  return (
    <Card className="md:w-1/3 md:p-8 h-fit ">
      <CardHeader className="text-center">
        <CardTitle>Upload Video</CardTitle>
        <CardDescription>Deepfake Check: Quick and Easy.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="video">Video File</Label>
              <Input id="video" type="file"/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full" onClick={submitForm}>Submit</Button>
      </CardFooter>
    </Card>
  )
}