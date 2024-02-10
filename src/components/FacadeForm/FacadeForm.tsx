import React, { useRef, useState } from "react"
import styles from "./FacadeForm.module.scss"
import { FieldValues, useForm } from "react-hook-form"
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
  const [titleValue, setTitleValue] = useState(title)
  const [descriptionValue, setDescriptionValue] = useState(description)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file changing")
    let file
    if (event.target.files) {
      file = event.target.files[0]
    }
    if (file) {
      setSelectedFile(file)
      setFileName(file.name)
    } else {
      setSelectedFile(null)
      setFileName("")
    }
  }

  const forma = useForm({
    mode: "onChange", // I want to change it to onBlur
  })
  const { register, handleSubmit, formState, reset } = forma
  const { isValid, touchedFields, errors } = formState

  const clearData = () => {
    setTitleValue("")
    setDescriptionValue("")
    setFileName("")
    setSelectedFile(null)
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
      //   onSubmit={(event) => {
      //     event.preventDefault()
      //     titleValue &&
      //       descriptionValue &&
      //       onSubmit(titleValue, descriptionValue, selectedFile)
      //     clearData()
      //   }}
    >
      <h1 className={styles.form__header}>Заполните данные</h1>

      <div style={{ position: "relative", width: `100%` }}>
        <input
          {...register("title", {
            required: "Обязательное поле",
            // pattern: {
            //     value: /^\w+\s(\w+\s)?\w+$/,
            //     message: "Некорректные данные",
            // },
          })}
          className={styles.form__input}
          //   value={titleValue}
          //   onChange={(e) => {
          //     setTitleValue(e.target.value)
          //     console.log(titleValue)
          //   }}
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
          //   value={descriptionValue}
          //   onChange={(e) => setDescriptionValue(e.target.value)}
        ></textarea>
        {errors?.description && touchedFields.description && (
          <div className={styles.form__input_message}>
            {errors?.description?.message?.toString()}
          </div>
        )}
      </div>
      <div style={{ position: "relative", width: `100%` }}>
        <div className={styles["form__file"]}>
          <input
            type="file"
            id="inp"
            accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="inp" className={styles["form__file-label"]}>
            {selectedFile === null && <>Выберите файл</>}
            {fileName}
          </label>
        </div>

        {/* {errors?.description && touchedFields.description && (
                <div className={styles.form__input_message}>
                {errors?.description?.message?.toString()}
                </div>
            )} */}
      </div>
      <Button disabled={!isValid} className={styles.form__submit} type="submit">
        Сохранить
      </Button>
    </form>
  )
}

export default FacadeForm
