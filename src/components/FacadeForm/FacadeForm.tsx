import React, { useRef, useState } from "react"
import styles from "./FacadeForm.module.scss"
import { Controller, FieldValues, useForm } from "react-hook-form"
import Button from "components/Button"

export type FacadeFormProps = {
  onSubmit: (title: string, description: string, file: File | null) => void
  title?: string
  description?: string
  fileTitle?: string
}

const FacadeForm: React.FC<FacadeFormProps> = ({
  onSubmit,
  title,
  description,
  fileTitle,
}) => {
  const form = useRef<HTMLFormElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setSelectedFile(file)
      setFileName(file.name)
    } else {
      setSelectedFile(null)
      setFileName("")
    }
  }

  const forma = useForm({
    mode: "onChange",
  })
  const { register, handleSubmit, formState, reset, control } = forma
  const { isValid, touchedFields, errors } = formState

  const clearData = () => {
    setFileName("")
  }

  const submitForm = (data: FieldValues) => {
    data.title &&
      data.description &&
      onSubmit(data.title, data.description, selectedFile)
    reset({
      title: "",
      description: "",
    })
    clearData()
  }

  return (
    <form
      ref={form}
      className={styles.form}
      onSubmit={handleSubmit(submitForm)}
    >
      <h1 className={styles.form__header}>Заполните данные</h1>

      <div style={{ position: "relative", width: `100%` }}>
        <input
          {...register("title", {
            required: "Обязательное поле",
          })}
          className={styles.form__input}
          placeholder="Название*"
        />
        {errors?.title && touchedFields.title && (
          <div className={styles.form__input_message}>
            {errors?.title?.message?.toString()}
          </div>
        )}
      </div>
      <div style={{ position: "relative", width: `100%` }}>
        <textarea
          {...register("description", {
            required: "Обязательное поле",
          })}
          className={styles.form__input_big}
          placeholder="Введите описание*"
        ></textarea>
        {errors?.description && touchedFields.description && (
          <div className={styles.form__input_message}>
            {errors?.description?.message?.toString()}
          </div>
        )}
      </div>

      <div style={{ position: "relative", width: `100%` }}>
        <div className={styles["form__file"]}>
          <Controller
            control={control}
            name="file"
            rules={{ required: "Обязательное поле" }}
            render={({ field }) => (
              <input
                {...field}
                type="file"
                id="inp"
                accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
                style={{ display: "none" }}
                onChange={(e) => {
                  field.onChange(e)
                  handleFileChange(e)
                }}
              />
            )}
          />

          <label htmlFor="inp" className={styles["form__file-label"]}>
            {fileName === "" && <>Выберите файл</>}
            {fileName}
          </label>
          {errors?.file && touchedFields.file && (
            <div className={styles.form__input_message}>
              {errors?.file?.message?.toString()}
            </div>
          )}
        </div>
      </div>
      <Button disabled={!isValid} className={styles.form__submit} type="submit">
        Сохранить
      </Button>
    </form>
  )
}

export default FacadeForm
