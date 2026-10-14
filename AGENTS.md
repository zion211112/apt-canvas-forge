<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the APT-LABS workspace as a single interactive application surface at `/`; module and page selections share the explorer and inspector context so changing views retains the workspace shell.
- Keep browser-safe module definitions and demo records in `src/lib/workspace-data.ts`; preview actions modify in-memory state only and must not imply live network transactions or connected AI.
- Define all workspace visual roles in `src/styles.css` and use the shared Button and Dialog controls for workspace interactions.
