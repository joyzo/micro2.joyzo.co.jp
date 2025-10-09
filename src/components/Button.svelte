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
      "bg-theme-primary text-white shadow-sm hover:bg-theme-primary-dark focus-visible:ring-theme-primary",
    secondary:
      "bg-theme-hover text-theme-text shadow-sm hover:bg-theme-border focus-visible:ring-theme-secondary",
    outline:
      "border border-theme-border bg-theme-background-secondary text-theme-text shadow-sm hover:bg-theme-background focus-visible:ring-theme-secondary",
    ghost: "text-theme-text hover:bg-theme-hover focus-visible:ring-theme-secondary",
    link: "text-theme-primary underline-offset-4 hover:underline focus-visible:ring-theme-primary",
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
