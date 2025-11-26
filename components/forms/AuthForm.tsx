"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
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
import Link from "next/link";
import ROUTES from "@/constants/routes";

// ---------- SCHEMAS ----------
const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Invalid username"),
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ---------- PROPS ----------
interface AuthFormProps {
  formType: "SIGN_IN" | "SIGN_UP";
  defaultValues: any;
  onSubmit: (
    data: any
  ) => Promise<{ success: boolean; data?: any; error?: any }>;
}

const AuthForm = ({ formType, defaultValues, onSubmit }: AuthFormProps) => {
  const isSignIn = formType === "SIGN_IN";

  const schema = isSignIn ? signInSchema : signUpSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFormSubmit = async (data: any) => {
    try {
      const result = await onSubmit(data);

      if (!result.success) {
        return toast("Error", { description: result.error || "Failed" });
      }

      toast("Success!", {
        description: isSignIn
          ? "Signed in successfully!"
          : "Account created successfully!",
      });

      // Auto-redirect
      if (isSignIn) window.location.href = ROUTES.HOME;
      else window.location.href = ROUTES.SIGN_IN;
    } catch (error) {
      toast("Error", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6 w-full"
      >
        {buttonText}
        {/* SIGN-UP EXTRA FIELDS */}
        {!isSignIn && (
          <>
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username *</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="johndoe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="john@example.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password *</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="•••••••" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full primary-gradient py-5 font-inter !text-light-900    ">
          {form.formState.isSubmitting
            ? isSignIn
              ? "Signing In..."
              : "Signing Up..."
            : isSignIn
            ? "Sign In"
            : "Sign Up"}
        </Button>

        <p className="text-center text-sm">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isSignIn ? ROUTES.SIGN_UP : ROUTES.SIGN_IN}
            className="text-primary-500"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default AuthForm;
