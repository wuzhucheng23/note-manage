import router from "@/router";

export const delayPush = (name, label, query = undefined) => {
    setTimeout(() => {
        router.push({
            name,
            label,
            query
        });
    }, 1500);
};

export const delayBack = () => {
    setTimeout(() => {
        router.back();
    }, 1500);
};

