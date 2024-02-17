import React, { useState } from "react"
import styles from "./ImageForm.module.scss"
import Button from "components/Button"
import { Controller, useForm } from "react-hook-form"

export type FacadeItemFormProps = {
  onSubmit: (file: File) => void
  isEditing?: boolean
}

const MAX_FILE_SIZE =  5 *  1024 *  1024;

const ImageForm: React.FC<FacadeItemFormProps> = ({ onSubmit, isEditing }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")

  const forma = useForm({
    mode: "onChange",
  })

  const { control, setValue, setError, clearErrors } = forma

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setValue("file", null);
        setError("file", {
          type: "manual",
          message: "Размер файла не должен превышать   5 МБ",
        });
        setSelectedFile(null);
        setFileName("");
      } else {
        setSelectedFile(file);
        setFileName(file.name);
        clearErrors("file");
      }
    } else {
      setSelectedFile(null);
      setFileName("");
      clearErrors("file");
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault()
        selectedFile && onSubmit(selectedFile)
      }}
    >
      <div className={styles["form__file"]}>
        <Controller
        control={control}
        name="file"
        rules={{
          required: isEditing ? false : "Обязательное поле",
        }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="file"
              id="inp"
              accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
              style={{ display: "none" }}
              onChange={(e) => {
                field.onChange(e);
                handleFileChange(e);
              }}
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
            </label>
            {error && (
              <div className={styles.form__input_message}>
                {error.message}
              </div>
            )}
            </div>
          )}
        />

      </div>
      <Button className={styles.form__submit} type="submit">
        Сохранить
      </Button>
    </form>
  )
}

export default ImageForm
