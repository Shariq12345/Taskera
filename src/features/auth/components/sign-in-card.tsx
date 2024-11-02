"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpWithGithub, signUpWithGoogle } from "@/lib/oauth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { UserCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { loginSchema } from "../schemas";
import { useLogin } from "@/features/auth/api/use-login";

export const SignInCard = () => {
  const { mutate, isPending } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="w-full md:w-[487px] shadow-xl border border-slate-200">
        <CardHeader className="space-y-3 text-center p-7">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Welcome <span className="text-blue-700">back</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <UserCircle2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            type="email"
                            id="email"
                            placeholder="name@company.com"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-blue-700 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button disabled={isPending} size="lg" className="w-full">
                Sign in
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardContent className="p-7 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            onClick={() => signUpWithGoogle()}
            disabled={isPending}
            variant="secondary"
            size="lg"
            className="w-full hover:bg-slate-100"
          >
            <FcGoogle className="mr-2 size-5" />
            Continue with Google
          </Button>

          <Button
            onClick={() => signUpWithGithub()}
            disabled={isPending}
            variant="secondary"
            size="lg"
            className="w-full hover:bg-slate-100"
          >
            <FaGithub className="mr-2 size-5" />
            Continue with Github
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
