import React, { useRef, useState } from "react"
import styles from "./FacadeForm.module.scss"
import { Controller, useForm } from "react-hook-form"
import Button from "components/Button"

export type FacadeFormProps = {
  onSubmit: (title: string, description: string, file: File | null) => void
  title?: string
  description?: string
  fileTitle?: string
  isEditing?: boolean
}

const FacadeForm: React.FC<FacadeFormProps> = ({
  onSubmit,
  title,
  description,
  fileTitle,
  isEditing,
}) => {
  const form = useRef<HTMLFormElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState(fileTitle)
  const [titleValue, setTitleValue] = useState(title)
  const [descriptionValue, setDescriptionValue] = useState(description)

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

  const submitForm = () => {
    titleValue &&
      descriptionValue &&
      onSubmit(titleValue, descriptionValue, selectedFile)
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
        {/* <input
          {...register("title", {
            required: "Обязательное поле",
          })}
          className={styles.form__input}
          placeholder="Название*"
        /> */}
        <Controller
          control={control}
          name="title"
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <input
              {...register("title", {
                required: "Обязательное поле",
              })}
              className={styles.form__input}
              placeholder="Название*"
              value={titleValue}
              onChange={(e) => {
                field.onChange(e), setTitleValue(e.target.value)
              }}
            />
          )}
        />
        {errors?.title && touchedFields.title && (
          <div className={styles.form__input_message}>
            {errors?.title?.message?.toString()}
          </div>
        )}
      </div>
      <div style={{ position: "relative", width: `100%` }}>
        <Controller
          control={control}
          name="description"
          rules={{ required: "Обязательное поле" }}
          render={({ field }) => (
            <textarea
              {...register("description", {
                required: "Обязательное поле",
              })}
              className={styles.form__input_big}
              placeholder="Введите описание*"
              value={descriptionValue}
              onChange={(e) => {
                field.onChange(e), setDescriptionValue(e.target.value)
              }}
            ></textarea>
          )}
        />
        {/* <textarea
          {...register("description", {
            required: "Обязательное поле",
          })}
          className={styles.form__input_big}
          placeholder="Введите описание*"
        ></textarea> */}
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
            rules={{ required: isEditing ? false : "Обязательное поле" }}
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
            {isEditing ? (
              !selectedFile ? (
                <>Измените файл</>
              ) : (
                <>{fileName}</>
              )
            ) : !selectedFile ? (
              <>Выберите файл</>
            ) : (
              <>{fileName}</>
            )}
            {/* {fileName === "" && <>Выберите файл</>}
            {fileName} */}
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
