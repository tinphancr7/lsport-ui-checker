'use client'

import React, { useMemo, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import NotifyMessage from "@/utils/notify";
import { Card, Skeleton } from "@nextui-org/react";

const TINY_MCE_KEY = "zfoufc6act8sgb8212yd14inbh3xn0qtgo5jjiqgvbesb9yc";

// TinyMCE so the global var exists
import "tinymce/tinymce";
// DOM model
import "tinymce/models/dom/model";
// Theme
import "tinymce/themes/silver";
// Toolbar icons
import "tinymce/icons/default";
// Editor styles
import "tinymce/skins/ui/oxide/skin";

// importing the plugin js.
import "tinymce/plugins/advlist";
import "tinymce/plugins/anchor";
import "tinymce/plugins/autolink";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/autosave";
import "tinymce/plugins/charmap";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/directionality";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/help";
import "tinymce/plugins/help/js/i18n/keynav/en";
import "tinymce/plugins/image";
import "tinymce/plugins/importcss";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/media";
import "tinymce/plugins/nonbreaking";
import "tinymce/plugins/pagebreak";
import "tinymce/plugins/preview";
import "tinymce/plugins/quickbars";
import "tinymce/plugins/save";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/table";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/wordcount";

// importing plugin resources
import "tinymce/plugins/emoticons/js/emojis";

// Content styles, including inline UI like fake cursors
import "tinymce/skins/content/default/content";
import "tinymce/skins/ui/oxide/content";

interface TinyMCEProps {
  value: string;
  placeholder?: string;
  initValue?: string;
  onEditorChange: (content: string, editor: any) => void;
  height?: number;
  type?: "default" | "comment";
}

const TinyMCE: React.FC<TinyMCEProps> = ({
  value,
  placeholder,
  initValue = "",
  onEditorChange,
  height,
  type = "default",
  ...rest
}) => {
  const editorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const plugins = [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
    "image",
    "codesample",
    "autoresize",
  ];

  const rel_list = [
    { title: "None", value: "" },
    { title: "No Follow", value: "nofollow" },
    {
      title: "No Follow No Opener No Referrer",
      value: "nofollow noopener noreferrer",
    },
  ];

  const toolbar1 =
    "undo redo | blocks | " +
    "formatselect |" +
    "bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | link image | code | gallery | codesample ";

  const toolbarComment = "image";

  const toolbar2 =
    "table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol";

  const minHeight = useMemo(
    () => (type === "comment" ? "min-h-36" : "min-h-max"),
    [type]
  );

  return (
    <div className={`relative ${minHeight}`}>
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 h-full">
          <Card className="absolute top-0 bottom-0 left-0 right-0 h-full space-y-5 p-4" radius="lg">
            <Skeleton isLoaded={false} className="rounded-lg absolute top-2 bottom-2 left-2 right-2">
              <div className="absolute top-2 bottom-2 left-2 right-2 rounded-lg bg-secondary"></div>
            </Skeleton>
          </Card>
        </div>
      )}

      <Editor
        apiKey={TINY_MCE_KEY}
        onInit={(evt, editor) => {
          setIsLoading(false);
          editorRef.current = editor;
        }}
        initialValue={initValue || ""}
        value={value}
        onEditorChange={onEditorChange}
        init={{
          placeholder: placeholder || "",
          height: height || 275,
          max_height: 600,
          resize: true,
          file_picker_callback: function (cb, value, meta) {
            var input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.onchange = function () {
              var file = this.files[0];

              // Check file size (example limit to 5MB)
              var maxSize = 5 * 1024 * 1024; // 5MB in bytes

              if (file.size > maxSize) {
                NotifyMessage(
                  "Kích thước tệp vượt quá giới hạn (5MB). Vui lòng chọn một tập tin nhỏ hơn!",
                  "info"
                );

                return;
              }

              var reader = new FileReader();
              reader.onload = function () {
                var id = "blobid1" + new Date().getTime();
                var blobCache =
                  editorRef.current.editorUpload.blobCache;
                var base64 = (reader.result as string).split(",")[1];
                var blobInfo = blobCache.create(
                  id,
                  file,
                  base64
                );

                blobCache.add(blobInfo);

                /* call the callback and populate the Title field with the file name */
                cb(blobInfo.blobUri(), { title: file.name });
              };
              reader.readAsDataURL(file);
            };
            input.click();
          },
          paste_data_images: true,
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          plugins: plugins,
          rel_list: rel_list,
          menubar: false,
          toolbar1: type === "comment" ? toolbarComment : toolbar1,
          // toolbar2: toolbar2,
          link_rel_list: [
            { title: "Nothing", value: "" },
            { title: "No Referrer", value: "noreferrer" },
            { title: "No Follow", value: "nofollow" },
            { title: "Sponsored", value: "sponsored" },
            { title: "UGC", value: "ugc" },
          ],
          content_style:
            "body { font-family: Montserrat, sans-serif; font-size:14px, padding: 12px; }",
        }}
        {...rest}
      />
    </div>
  );
};

export default TinyMCE;
