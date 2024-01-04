"use client";

import Logo from "@/assets/cypresslogo.svg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { actionLoginUser } from "@/lib/server-actions/auth-actions";
import { FormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PiSpinnerGapLight } from "react-icons/pi";
import { z } from "zod";
import Template from "../Template";

export default function Login() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData);
    if (error) {
      form.reset();
      setSubmitError(error.message);
    }
    router.replace("/dashboard");
  };

  return (
    <Template>
      <Form {...form}>
        <form
          onChange={() => {
            if (submitError) setSubmitError("");
          }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
        >
          <Link href="/" className="w-full flex justify-left items-center">
            <Image src={Logo} alt="Cypress Logo" width={50} height={50} />
            <span className="font-semibold dark:text-white text-4xl first-letter:ml-2">
              Cypress.
            </span>
          </Link>
          <FormDescription className="text-foreground/60">
            An all-In-One Collaboration and Productivity Platform
          </FormDescription>
          <FormField
            disabled={isLoading}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="E-mail" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <Button
            size={"lg"}
            type="submit"
            className="w-full p-6"
            disabled={isLoading}
          >
            {!isLoading ? (
              "Login"
            ) : (
              <PiSpinnerGapLight
                className="animate-spin text-slate-50"
                size={28}
              />
            )}
          </Button>
          <span className="self-container">
            Don`t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </span>
        </form>
      </Form>
    </Template>
  );
}
