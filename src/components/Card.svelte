<script lang="ts">
  export let className: string = '';
  export let padding: 'sm' | 'md' | 'lg' = 'md';
  
  const paddingClasses = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-10'
  };
  
  $: classes = `bg-white text-black flex flex-col gap-6 rounded-none border border-gray-200 shadow-sm ${paddingClasses[padding]} ${className}`;
</script>

<div class={classes}>
  <slot />
</div>
