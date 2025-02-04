import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Signup = ({ onSubmit, errors }) => {
  return (
    <section className="py-2">
      <div className="">
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <img
                src="https://shadcnblocks.com/images/block/block-1.svg"
                alt="logo"
                className="mb-7 h-10 w-auto"
              />
              <p className="mb-2 text-2xl font-bold">Sign Up</p>
              <p className="text-muted-foreground">
                A minute of your time. A lifetime of memories.
              </p>
            </div>
            <div>
              <div id="errors">
                <ol className="list-decimal list-inside mb-2 text-red-500">
                  {errors.map((error, key) => <li key={key}>{error}</li>)}
                </ol>
              </div>
              <form onSubmit={onSubmit}>
                <div className="grid gap-4">
                  <Input type="text" placeholder="Enter your username" name="username" required />
                  <Input type="email" placeholder="Enter your email" name="email" required />
                  <div>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      name="password1"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      name="password2"
                      required
                    />
                  </div>
                  <Button type="submit" className="mt-2 w-full">
                    Create an account
                  </Button>
                  <Button variant="outline" className="w-full">
                    Sign up with Google
                  </Button>
                </div>
                </form>

              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Already have an account?</p>
                <a href="#" className="font-medium text-primary">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
