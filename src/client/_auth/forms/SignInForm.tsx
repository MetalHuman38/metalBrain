// Note: SignIn Form Component
import Loader from "@/client/components/shared/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { useLoginUserMutation } from "@/client/services/react-query/userQueryAndMutations/UserQueriesMutations";
import { SignInValidation } from "@/client/services/validations/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useUserContext } from "@/client/services/context/user/UseContext";

const SignInForm = () => {
  const [isLoading] = useState(false);
  const userRef = useRef(null);
  const errRef = useRef(null);
  const { user, setUser } = useUserContext();
  const { setIsUserAuthenticated } = useUserContext();
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Use the useLoginUser hook to get the mutation function
  const loginUserMutation = useLoginUserMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    try {
      const user = await loginUserMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });
      if (!user) {
        toast({
          description: `An error occurred while logging in. Please try again.`,
        });
      }
      toast({
        title: "Sign In successful.",
        description: `Welcome back ${user?.username}`,
      });
      setIsUserAuthenticated(true);
      navigate("/", { replace: true });
      form.reset();
    } catch (error) {
      console.error("Error logging in user:", error);
      toast({
        title: "Error logging in",
        description: `An error occurred while logging in. Please try again.`,
      });
    } finally {
      form.reset();
    }
    return user;
  }

  useEffect(() => {
    if (userRef.current) {
      (userRef.current as HTMLInputElement).focus();
    }
  }, []);

  useEffect(() => {
    setErrorMsg("");
  }, [user, password]);

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.jpg" alt="Logo" className="w-24 h-24" />
        <p
          ref={errRef}
          className={errMsg ? "error-message" : "offscreen"}
          arial-live="assertive"
        >
          {errMsg}
        </p>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 ">
          Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your log in details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-3">email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="shad-input"
                    {...field}
                    autoComplete="email"
                    ref={userRef}
                    onChange={(e) => {
                      field.onChange(e);
                      setUser(e.target.value as any);
                    }}
                    value={user?.toString() || ""}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-3">password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="shad-input"
                    {...field}
                    autoComplete="current-password"
                    onChange={(e) => {
                      field.onChange(e);
                      setPassword(e.target.value);
                    }}
                    value={password}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
          <p className="text-small-regular text-light-3 text-center mt-2">
            Dont have an account?
            <Link to="/sign-up" className="text-light-8 text-small-bold ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignInForm;
