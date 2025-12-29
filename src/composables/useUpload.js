import { fileValidate, generateFileObject } from "@/common/utils/helpers";
import { ref, watch } from "vue";

export function useUpload(props, emit, file) {
    const files = ref([]);
    const errors = ref([]);
    const isDragOver = ref(false);

    watch(
        () => props.modelValue,
        (val) => {
            files.value = val;
        },
        { immediate: true, deep: true }
    );

    const onChooseFile = (e) => {
        const selected = Array.from(e.target.files);
        process(selected);
        file.value.value = '';
    }

    const onDrop = (e) => {
        isDragOver.value = false;
        const dropped = Array.from(e.dataTransfer.files);
        process(dropped);
    }

    const process = (inputs) => {
        errors.value = [];

        const valid = inputs.filter((file) => {
            const err = fileValidate(file, props);

            if (err.length) {
                errors.value.push(...err);
                return false;
            }

            return true;
        });

        const objs = valid.map(generateFileObject);
        files.value = props.multi ? [...files.value, ...objs] : objs.slice(0, 1);

        if (props.multi) {
            emit('update:modelValue', files.value.map(file => file.file));
        } else {
            emit('update:modelValue', ...files.value.map(file => file.file));
        }
    }

    const remove = (index) => {
        const removed = files.value.splice(index, 1);
        if (props.multi) {
            emit('update:modelValue', files.value.map(file => file.file));
        } else {
            emit('update:modelValue', ...files.value.map(file => file.file));
        }

        if (removed[0]?.preview) URL.revokeObjectURL(removed[0].preview);
    }

    return { files, errors, isDragOver, onDrop, onChooseFile, remove };
}