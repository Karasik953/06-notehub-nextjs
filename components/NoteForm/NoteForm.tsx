// src/components/NoteForm/NoteForm.tsx
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAddNote } from "../../hooks/useAddNote"
import type { CreateNoteDto } from "../../types/note"
import css from "./NoteForm.module.css"

interface NoteFormProps {
  onClose: () => void
}

const schema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required("Required"),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Required"),
})

export default function NoteForm({ onClose }: NoteFormProps) {
  const { mutateAsync, isPending } = useAddNote()

  return (
    <Formik<CreateNoteDto>
      initialValues={{ title: "", content: "", tag: "Todo" }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await mutateAsync(values)   // <— без зайвих кастів
          resetForm()
          onClose()
        } catch {
          // можете показати toast або помилку поруч з формою
        }
      }}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
