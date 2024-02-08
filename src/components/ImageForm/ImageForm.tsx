import React, { useState } from "react"
import styles from "./ImageForm.module.scss"
import Button from "components/Button"

export type FacadeItemFormProps = {
  onSubmit: (file: File) => void
  fileTitle?: string
}

const ImageForm: React.FC<FacadeItemFormProps> = ({ fileTitle, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault()
        selectedFile && onSubmit(selectedFile)
      }}
    >
      <div className={styles["form__file"]}>
        <input
          type="file"
          id="imageFileInput"
          accept="image/jpeg, image/png, image/gif, image/bmp"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="imageFileInput" className={styles["form__file-label"]}>
          {selectedFile === null && <>Выберите файл</>}
          {fileName}
        </label>
      </div>
      <Button className={styles.form__submit} type="submit">
        Сохранить
      </Button>
    </form>
  )
}

export default ImageForm
