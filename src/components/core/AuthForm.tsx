import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { Github } from 'lucide-react'

export const AuthForm = ({ h1_text, description, btn_text, form_type }: { h1_text: string, description: string, btn_text: string, form_type: string }) => {

  return (
    <div className="w-full h-screen flex text-slate-300">

      {/* left */}
      <div className="left w-[50%] h-full overflow-hidden flex items-center justify-center bg-slate-400">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="size-[75%] text-slate-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
        </svg>

      </div>


      {/* right */}
      <div className="right w-[50%] h-full flex items-center bg-slate-600">
        <div className="lg:p-8 flex w-full items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">{h1_text}</h1> {/* h1_text */}
              <p className="text-sm text-muted-foreground">{description}</p>  {/* description */}
            </div>

            <div className="grid gap-6">
              <form>
                <div className='grid gap-2'>
                  <div className="grid gap-1">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only">Email</label>
                    <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder='name@example.com' type='email' />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only">Password</label>
                    <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder='password' type='password' />
                    {form_type === "signup" &&
                      <div>
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only">Confirm Password</label>
                        <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" placeholder='confirm password' type='password' />
                      </div>
                    }
                  </div>

                  <Button variant="secondary">{btn_text}</Button> {/* btn_text */}
                </div>
              </form>
              <div className="relative">

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-[35%] border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background p-2 text-muted-foreground">Or continue with</span>
                  </div>
                  <div className="absolute  inset-0 flex justify-end items-center">
                    <span className="w-[35%] border-t"></span>
                  </div>
                </div>


                <div className="flex justify-center">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2" type="button">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </button>
                </div>
              </div>

              {form_type === "signup" ? (
                <p className="px-8 text-center text-sm text-muted-foreground">
                  Already have an account?
                  <Link className="underline underline-offset-4 hover:text-primary" to="/login"> Sign in </Link>
                </p>
              ) : (
                <p className="px-8 text-center text-sm text-muted-foreground">
                  Don't have an account?
                  <Link className="underline underline-offset-4 hover:text-primary" to="/signup"> Sign up </Link>
                </p>
              )}

              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our
                <a className="underline underline-offset-4 hover:text-primary" href="/terms"> Terms of Service </a>
                and
                <a className="underline underline-offset-4 hover:text-primary" href="/privacy"> Privacy Policy </a>.
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
