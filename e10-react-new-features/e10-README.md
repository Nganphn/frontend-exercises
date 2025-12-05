1. **How does the new concurrency work and what's the main difference to the old model?**
    
    New concurrency means React can pause, resume, and even cancel a render if something more important happens.
    
    Old React rendered everything in one go, without interruption.
    
    So the main difference:
    
    - Old: one big blocking render, UI can feel slow.
    - New: interruptible rendering, React can do heavy work in the background and keep the UI feeling responsive.
2. **What is a `<Suspense>` component and give one example where it should be used?**
    
    `<Suspense>` is a React component that shows a fallback UI (like “Loading…”) while some child component is not ready yet.
    
    Example use:
    
    ```jsx
    <Suspense fallback={<p>Loading comments...</p>}>
      <Comments />
    </Suspense>
    ```
    
    Here I would use `<Suspense>` when loading comments from the server, so the user sees a nice loading message instead of an empty screen.
    
3. **When should you use SSR and when not?**
    
    Use SSR when:
    
    - We care about SEO (blogs, shops, marketing sites).
    - W want the page to show something quickly on first load.
    
    Don't use SSR when:
    
    - It's a pure web app/dashboard where SEO doesn't matter much.
    - The app is mostly client-side interactive and SSR just adds complexity without clear benefit.
4. **What is a `useTransition()` hook and where should it be used?**
    
    `useTransition()` lets us mark some state updates as “not urgent”, so React can keep urgent stuff fast and push heavier work into the background.
    
    I'd use it when:
    
    - One user action causes both a small fast update and a big slow update.
        
        Example: typing into a search box while React updates a large list of results in the background.
        
5. **What is a `useId` hook and where should it be used?**
    
    `useId()` creates a unique, stable ID that works on both client and server.
    
    I would use it for:
    
    - Accessibility IDs, like connecting `<label>` and `<input>`:
        
        ```jsx
        const id = useId();
        <label htmlFor={id}>Name</label>
        <input id={id} />
        ```
        
    
    Not for list keys, just for things that need unique IDs in the DOM.
    
6. **What is a `useOptimistic()` hook and where should it be used?**
    
    `useOptimistic()` lets we show the "future" result immediately while a request is still in progress, and then auto-correct if the server disagrees. Optimistic update.
    
    I'd use it when:
    
    - The user updates something (like their name, a like button, a todo item), and I want the UI to feel instant, without waiting for the server, but still be able to roll back if there's an error.
7. **What is a `useActionState()` hook and where should it be used?**
    
    `useActionState()` is a helper for Actions. It gives us:
    
    - the last result of the action (often an error),
    - a wrapped action function,
    - and a pending state.
    
    I'd use it for:
    
    - Forms that submit data (update profile, change password, etc.), where I want easy handling of pending, error, and success states without writing a lot of manual `useState` logic.
8. **What is a `use` API and where should it be used?**
    
    `use()` is a function that can read resources in render, like promises or context.
    
    If we pass a promise to `use()`, React will suspend until the promise is resolved and show a `<Suspense>` fallback in the meantime.
    
    I'd use it when:
    
    - I'm in a setup where data is provided as a promise that supports Suspense, and I want to read that data directly inside my component.
    - Also to read context conditionally (e.g. after an early return) where `useContext` wouldn't work.
9. **What are React Server Components and where should they be used?**
    
    React Server Components are components that run on the server, not in the browser. They can fetch data directly on the server and send only the rendered result to the client, often with less JavaScript.
    
    I'd use them:
    
    - With frameworks that support them.
    - For data-heavy or mostly static parts of the UI (layouts, product lists, article pages), where I want better performance and smaller bundles on the client.
10. **Other good new feature + why it's good**
    
    One feature I like: native support for `<title>`, `<meta>`, and `<link>` inside components (React 19).
    
    Example:
    
    ```jsx
    function BlogPost({ post }) {
      return (
        <article>
          <title>{post.title}</title>
          <meta name="description" content={post.summary} />
          <h1>{post.title}</h1>
          ...
        </article>
      );
    }
    ```
    
    Why it's good:
    
    - I can define page metadata right next to the component that needs it.
    - React will automatically move these tags into `<head>` for me.
    - I don't need extra libraries for simple SEO and metadata cases, and it works with SSR and streaming.