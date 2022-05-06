const isSmallScreen = window.matchMedia("(max-width: 1023.5px)").matches;

export const TypeColors = [
  {
    textColor: "#fff",
    bgColor: "#cc88c4",
  },
  {
    textColor: "#000",
    bgColor: "#ffe9e9",
  },
  {
    textColor: "#fff",
    bgColor: "#a088cc",
  },
  {
    textColor: "#000",
    bgColor: "#c7f0ff",
  },
  {
    textColor: "#000",
    bgColor: "#B9FFBF",
  },
  {
    textColor: "#000",
    bgColor: "#fbffc1",
  },
];

export const defaultColor = {
  textColor: "#000",
  bgColor: "#fff",
};

export const configEditor = {
  selector: "textarea#full-featured",
  indentation: "20pt",
  spellchecker_language: "es",

  plugins: [
    "preview",
    "powerpaste",
    "casechange",
    "importcss",
    "tinydrive",
    "searchreplace",
    "autolink",
    "autosave",
    "save",
    "directionality",
    "visualblocks",
    "visualchars",
    "link",
    "codesample",
    "table",
    "insertdatetime",
    "advlist",
    "lists",
    "checklist",
    "wordcount",
    "tinymcespellchecker",
    "help",
    "formatpainter",
    "permanentpen",
    "charmap",
    "mentions",
    "quickbars",
    "emoticons",
    "advtable",
    "export",
    "tinymcespellchecker",
  ],
  mobile: {
    plugins: [
      "preview",
      "powerpaste",
      "casechange",
      "importcss",
      "tinydrive",
      "searchreplace",
      "autolink",
      "autosave",
      "save",
      "directionality",
      "visualblocks",
      "visualchars",
      "link",
      "codesample",
      "table",
      "charmap",
      "insertdatetime",
      "advlist",
      "lists",
      "checklist",
      "wordcount",
      "tinymcespellchecker",
      "help",
      "formatpainter",
      "mentions",
      "quickbars",
      "emoticons",
      "advtable",
      "tinymcespellchecker",
    ],
  },
  menubar: "file edit view insert format tools table  help",
  toolbar:
    "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | charmap emoticons |  preview print |  link codesample | ltr rtl | language",
  toolbar_sticky: true,
  toolbar_sticky_offset: isSmallScreen ? 102 : 108,
  autosave_ask_before_unload: true,
  autosave_interval: "30s",
  autosave_prefix: "{path}{query}-{id}-",
  autosave_restore_when_empty: false,
  autosave_retention: "2m",
  importcss_append: true,
  template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
  template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
  height: 400,
  noneditable_class: "mceNonEditable",
  toolbar_mode: "sliding",
  spellchecker_ignore_list: ["Ephox", "Moxiecode"],
  content_style: ".mymention{ color: gray; }",
  content_langs: [
    { title: "Spanish", code: "es" },
    { title: "English", code: "en" },
  ],
  directionality: "ltr",
};
