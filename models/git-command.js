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
    // status(){}
    status(){        
        let message = `You have ${Object.keys(this.working_directory.new_changes).length} change/s.\n`;

        for (let i = 0; i < Object.keys(this.working_directory.files).length; i++) {
            if(i == Object.keys(this.working_directory.files).length - 1) message += `${Object.keys(this.working_directory.files)[i]}`
            else message += `${Object.keys(this.working_directory.files)[i]}\n`;
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
            Create logic here and run unit testing.
        */
        else if(path_file === ".") {
            for (let file of Object.keys(modified_files)) {
                this.staging.push(file);
                delete modified_files[file];
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