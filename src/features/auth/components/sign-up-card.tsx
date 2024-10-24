"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { User, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas";
import { useRegister } from "@/features/auth/api/use-register";

export const SignUpCard = () => {
  const { mutate, isPending } = useRegister();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate({ json: values });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50/50 p-4">
      <Card className="w-full md:w-[700px] shadow-2xl border-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Social Login Section */}
          <div className="md:w-[250px] bg-gradient-to-b from-gray-900 to-gray-800 p-8 flex flex-col justify-center space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-white text-lg font-semibold mb-2">
                Quick Access
              </h3>
              <p className="text-gray-400 text-sm">Connect with</p>
            </div>

            <Button
              disabled={isPending}
              variant="secondary"
              size="lg"
              className="bg-white hover:bg-gray-50 text-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FcGoogle className="mr-2 size-5" /> Google
            </Button>

            <Button
              disabled={isPending}
              variant="secondary"
              size="lg"
              className="bg-[#24292F] hover:bg-[#2c3137] text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <FaGithub className="mr-2 size-5" /> GitHub
            </Button>
          </div>

          {/* Form Section */}
          <div className="flex-grow bg-white p-8">
            <CardHeader className="text-center p-0 mb-8">
              {/* <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center transform transition-transform hover:scale-105">
                  <span className="text-2xl font-bold text-white">T</span>
                </div>
              </div> */}
              <CardTitle className="text-2xl font-semibold mb-2">
                Create an <span className="text-blue-700">account</span>
              </CardTitle>
              <CardDescription className="text-gray-500">
                By signing up, you agree to our{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Terms of Service
                </Link>
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Username
                        </FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your username"
                              className="pl-10 h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Email</FormLabel>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="name@company.com"
                              className="pl-10 h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">
                          Password
                        </FormLabel>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input
                              {...field}
                              type="password"
                              placeholder="Enter your password"
                              className="pl-10 h-12 border-gray-300 focus:border-blue-600 focus:ring-blue-600 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm mt-1" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    disabled={isPending}
                    type="submit"
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-12 rounded-lg transition-colors duration-200"
                  >
                    Create account
                  </Button>
                </form>
              </Form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
};
