class GitCommand {
    constructor(working_directory){
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    // Paste the codes you already did from the "Git Out Bug!" assignment
    // status(){}
    status(){
        let files = this.working_directory.new_changes;
        let message = `You have ${Object.keys(files).length} change/s.\n`;

        for (let i = 0; i < Object.keys(files).length; i++) {
            if(i == Object.keys(files).length - 1) message += `${Object.keys(files)[i]}`
            else message += `${Object.keys(files)[i]}\n`;
        }
        
        return message;
    }

    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        /*
            Create logic here then run unit testing. Make sure that they all pass before sending PR.
        */
        else if (path_file === "*") {
            for (let file of Object.keys(modified_files)) {
                if(file.startsWith(".github/")) {
                    this.staging.push(modified_files[file]);
                }else {
                    delete modified_files[file];
                }
            }
        }
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;
