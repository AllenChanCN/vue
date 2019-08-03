new Vue({
    el: '#notebook',
    data(){
        return {
            // content: localStorage.getItem("content") || 'You can write in  **markdown**',
            notes:[],
            selectedId: null,
        }
    },
    computed:{
        notePreview(){
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },
        addButtonTitle(){
            return this.notes.length + 'notes(s) already'
        },
        selectedNote(){
            return this.selectedId ? this.notes.find(note => note.id === this.selectedId) : ""
        }
    },
    watch:{
        content:{
            handler: 'saveNote'
        }
    },
    methods:{
        saveNote(){
            console.log('saving note:', this.selectedNote.content)
            localStorage.setItem('content', this.selectedNote.content)
            // this.reportOperation("saving")
        },
        reportOperation(opName){
            console.log("The ",opName, "operation is completed!")
        },
        addNote(){
            const time = Date.now()
            const note = {
                id: String(time),
                title: 'New note' + (this.notes.length + 1),
                content: '**Hi** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
                created: time,
                favrite: false,
            }
            this.notes.push(note)
        },
        selectNote(note){
            this.selectedId = note.id
        }
    },
    // created(){
    //     this.content = localStorage.getItem("content") || 'You can write in  **markdown**'
    // },
})