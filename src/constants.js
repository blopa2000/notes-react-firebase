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

  plugins:
    "preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export tinymcespellchecker",
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
      "advcode",
      "visualblocks",
      "visualchars",
      "fullscreen",
      "image",
      "link",
      "media",
      "mediaembed",
      "template",
      "codesample",
      "table",
      "charmap",
      "pagebreak",
      "nonbreaking",
      "anchor",
      "tableofcontents",
      "insertdatetime",
      "advlist",
      "lists",
      "checklist",
      "wordcount",
      "tinymcespellchecker",
      "a11ychecker",
      "help",
      "formatpainter",
      "pageembed",
      "charmap",
      "mentions",
      "quickbars",
      "linkchecker",
      "emoticons",
      "advtable",
      "tinymcespellchecker",
    ],
  },
  menu: {
    tc: {
      title: "Comments",
      items: "addcomment showcomments deleteallconversations",
    },
  },
  menubar: "file edit view insert format tools table tc help",
  toolbar:
    "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment | language",
  toolbar_sticky: true,
  toolbar_sticky_offset: isSmallScreen ? 102 : 108,
  autosave_ask_before_unload: true,
  autosave_interval: "30s",
  autosave_prefix: "{path}{query}-{id}-",
  autosave_restore_when_empty: false,
  autosave_retention: "2m",
  image_advtab: true,
  link_list: [
    { title: "My page 1", value: "https://www.tiny.cloud" },
    { title: "My page 2", value: "http://www.moxiecode.com" },
  ],
  image_list: [
    { title: "My page 1", value: "https://www.tiny.cloud" },
    { title: "My page 2", value: "http://www.moxiecode.com" },
  ],
  image_class_list: [
    { title: "None", value: "" },
    { title: "Some class", value: "class-name" },
  ],
  importcss_append: true,
  templates: [
    {
      title: "New Table",
      description: "creates a new table",
      content:
        '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
    },
    {
      title: "Starting my story",
      description: "A cure for writers block",
      content: "Once upon a time...",
    },
    {
      title: "New list with dates",
      description: "New List with dates",
      content:
        '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
    },
  ],

  template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
  template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
  height: 400,
  image_caption: true,
  quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
  noneditable_class: "mceNonEditable",
  toolbar_mode: "sliding",
  spellchecker_ignore_list: ["Ephox", "Moxiecode"],
  tinycomments_mode: "embedded",
  content_style: ".mymention{ color: gray; }",
  contextmenu: "link image editimage table configurepermanentpen",
  a11y_advanced_options: true,
  mentions_selector: ".mymention",
  mentions_item_type: "profile",
  content_langs: [
    { title: "Spanish", code: "es" },
    { title: "English", code: "en" },
  ],
  directionality: "ltr",
};
