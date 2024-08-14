import { Avatar, Button } from "@nextui-org/react";
import { useRef, useState, useMemo } from "react";

function UploadAvatar({ file, src, setFile, ...rest } : { file: any, src: string, setFile: any}) {
    const ref = useRef<any>(null);
    const [imageSources, setImageSources] = useState<any>({});

    const handleRefInput = () => {
        ref.current.click();
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
    };

    const handleDrop = (e: any) => {
        e.preventDefault();

        const files = e.dataTransfer.files;

        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleUploadFile = (event: any) => {
        setFile(event.target.files[0]);
    };

    const renderImage = useMemo(() => {
        if(!file) return (
            <div className="relative group/item transition-all ease-linear duration-100">
                <Avatar
                    src={src || ""}
                    isBordered
                    showFallback
                    classNames={{
                        base: "w-20 h-20 max-md:w-14 max-md:h-14",
                        img: "object-cover"
                    }}
                />
                <span className="max-md:hidden group-hover/item:visible invisible transition-all ease-linear duration-100 absolute top-1/2 left-1/4 -translate-x-[20%] -translate-y-[50%] text-dark font-medium text-xs text-wrap bg-light/80 rounded-full py-1 px-2">
                    Chọn ảnh đại diện
                </span>
            </div>
        )

        const imgsType = ["jpeg", "jpg", "png", "gif", "tiff", "psd"];
        const fileExtension = file?.name?.split(".").pop()?.toLowerCase();

        if (imgsType.includes(fileExtension)) {
            if (!imageSources[file.name]) {
                const reader = new FileReader();

                reader.onload = () => {
                    setImageSources((prev: any) => ({
                        ...prev,
                        [file.name]: reader.result,
                    }));
                };
                
                reader.readAsDataURL(file);
            }
        }

        return (
            <div className="relative group/item transition-all ease-linear duration-100">
                <Avatar
                    showFallback
                    isBordered
                    src={imageSources[file.name] || ""}
                    classNames={{
                        base: "w-20 h-20 max-md:w-14 max-md:h-14"
                    }}
                />
                <span className="max-md:hidden group-hover/item:visible invisible transition-all ease-linear duration-100 absolute top-1/2 left-1/4 -translate-x-[20%] -translate-y-[50%] text-dark font-medium text-xs text-wrap bg-light/80 rounded-full py-1 px-2">
                    Chọn ảnh đại diện
                </span>
            </div>
        );
    }, [file, imageSources, src]);

    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
            <Button
                radius="full"
                variant="bordered"
                className="px-0 py-0 min-w-max w-max h-max"
                onPress={handleRefInput}
            >
                {renderImage}
            </Button>

            <input
                ref={ref}
                hidden
                multiple={false}
                type="file"
                onChange={handleUploadFile}
                {...rest}
            />
        </div>
    );
}

export default UploadAvatar;