import { Note } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import Fieldset from "@/components/ui/Fieldset"

export default function Page() {
  return (
    <div className="grid gap-y-3.5">
      <Fieldset heading="Features">
        <Fieldset.Inner>Yeet</Fieldset.Inner>
        <div className="mt-2 flex justify-end">
          <Button>Save</Button>
        </div>
      </Fieldset>
      <Fieldset heading="Authentication">
        <Fieldset.Inner>Yeet</Fieldset.Inner>
      </Fieldset>
      <Fieldset heading="Account deletion">
        <Fieldset.Inner>
          <div className="flex flex-col justify-start gap-y-1.5">
            <p className="leading-relaxed">
              Deleting your account would mean that you'll lose comments, favorites,
              characters, and [number] of your listings, will no longer be available.{" "}
              <strong>
                Remember: this action is irreversable and cannot be restored!
              </strong>
            </p>
            <div className="mt-2">
              <Note type="warning" inline>
                Accounts that were created 30 days prior can't be deleted.
              </Note>
            </div>

            <div className="mt-2 flex gap-x-2">
              <Button variant="error-secondary">Deactivate account</Button>
              <Button variant="error">Delete account</Button>
            </div>
          </div>
        </Fieldset.Inner>
        {/* <div className="mt-3.5 mb-0.5">Learn more about account deletion</div> */}
      </Fieldset>
    </div>
  )
}
