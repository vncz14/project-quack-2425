import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { hasCookie } from 'cookies-next/client'
import { redirect } from "next/navigation"
export default function Page() {
    return (
        <>
            <h1>Settings</h1>
            <div>
                <h2>Account info</h2>
                <ul>
                    <li>Name:</li>
                    <li>Username:</li>
                    <li>Phone Number:</li>
                    <li>Email Address:</li>
                </ul>
            </div>
            <div>
                <h2>Login Methods</h2>
                <ul>
                    <li>Password:</li>
                    <li>Enable 2auth email:</li>
                </ul>
            </div>
            <div>
                <h2>Personal</h2>
                <ul>
                    <li>Birthday:</li>
                    <li>Gender (Optional):</li>
                    <li>Theme:</li>
                </ul>
            </div>
            <div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="my_instagram">Instagram</Label>
                    <Input type="url" id="my_instagram" placeholder="instagram" />
                </div> 
            </div>
            <div>
                <h2>Social networks visibility</h2>
                <p>Who can see links to your social networks profile</p>
                <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Everyone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Friends, followers & people I follow</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Friends & people I follow</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">No one</Label>
                    </div>
                </RadioGroup>

            </div>
        </>
    )
}