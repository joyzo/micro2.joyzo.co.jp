<script lang="ts">
  export let variant: "primary" | "secondary" | "outline" | "ghost" | "link" =
    "primary";
  export let size: "sm" | "md" | "lg" = "md";
  export let href: string | undefined = undefined;
  export let target: string | undefined = undefined;
  export let disabled: boolean = false;
  export let className: string = "";

  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-none";

  const variantClasses = {
    primary:
      "bg-gray-800 text-white shadow-sm hover:bg-gray-700 focus-visible:ring-gray-800",
    secondary:
      "bg-gray-100 text-black shadow-sm hover:bg-gray-200 focus-visible:ring-gray-500",
    outline:
      "border border-gray-300 bg-white text-black shadow-sm hover:bg-gray-50 focus-visible:ring-gray-500",
    ghost: "text-black hover:bg-gray-100 focus-visible:ring-gray-500",
    link: "text-gray-800 underline-offset-4 hover:underline focus-visible:ring-gray-800",
  };

  const sizeClasses = {
    sm: "h-10 px-4 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  $: classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
</script>

{#if href}
  <a {href} {target} class={classes} class:pointer-events-none={disabled}>
    <slot />
  </a>
{:else}
  <button class={classes} {disabled}>
    <slot />
  </button>
{/if}
