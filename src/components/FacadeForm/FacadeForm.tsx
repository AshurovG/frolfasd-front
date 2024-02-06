import React, { useState } from 'react'
import styles from './FacadeForm.module.scss'
import { useForm } from "react-hook-form"
import Button from 'components/Button';

export type FacadeFormProps = {
    onSubmit: (title: string, description: string, file: File | null) => void
    title?: string
    description?: string
    fileTitle?: string
};

const FacadeForm: React.FC<FacadeFormProps> = ({onSubmit, title, description, fileTitle}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState(''); 
    const [titleValue, setTitleValue] = useState(title)
    const [descriptionValue, setDescriptionValue] = useState(description)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file
        if (event.target.files) {
            file = event.target.files[0];
        }
        if (file) {
          setSelectedFile(file);
          setFileName(file.name);
        } else {
          setSelectedFile(null);
          setFileName('');
        }
    };

    const forma = useForm({
        mode: "onChange"
    })
    const { register } = forma
    return (
        <form
            className={styles.form}
            onSubmit={(event) => { event.preventDefault();  titleValue && descriptionValue && onSubmit(titleValue, descriptionValue, selectedFile)}}
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
                value={titleValue}
                onChange={(e) => {setTitleValue(e.target.value); console.log(titleValue)}}
                placeholder="Название*"
            />
            {/* {errors?.fio && touchedFields.fio && (
                <div className={styles.form__input_message}>
                {errors?.fio?.message?.toString()}
                </div>
            )} */}
            </div>
            <div style={{ position: "relative", width: `100%` }}>
            <textarea
            {...register("description", {
              required: "Обязательное поле",
            })}
            className={styles.form__input_big}
            placeholder="Введите описание*"
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          ></textarea>
            {/* {errors?.email && touchedFields.email && (
                <div className={styles.form__input_message}>
                {errors?.email?.message?.toString()}
                </div>
            )} */}
            </div>
            <div style={{ position: "relative", width: `100%` }}>
            {/* <input
            type="file"
            accept="image/jpeg, image/png, image/gif, image/bmp"
            {...register("image", {
                required: "Обязательное поле",
            })}
            className={styles.form__input}
            placeholder="Главное фото*"
            /> */}

            <div className={styles['form__file']}>
                <input
                    type="file"
                    id="imageFileInput"
                    accept="image/jpeg, image/png, image/gif, image/bmp"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <label htmlFor="imageFileInput" className={styles['form__file-label']}>
                    { selectedFile === null && <>Выберите файл</>}
                    {fileName}
                </label>
            </div>


            {/* {errors?.description && touchedFields.description && (
                <div className={styles.form__input_message}>
                {errors?.description?.message?.toString()}
                </div>
            )} */}
            </div>
            <Button type="submit">
                Сохранить
            </Button>
        </form>
    )
}

export default FacadeForm