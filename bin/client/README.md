
## Bash script for running g.alerts remotely

Only dependencies besides Bash are ssh, ssh-keygen, and scp.

### Windows, without git

1. Open up the "PowerShell" (lol) console
1. Type `bash`
1. `curl -o g.alerts https://raw.githubusercontent.com/pixelsnob/g.alerts/master/bin/client/runner; chmod 755 g.alerts`
1. `chmod 755 runner`
1. `./g.alerts` to run

On first run, you will want to generate a public/private key pair by entering the "generate key" option in the menu. Once the public key is authorized on the server, you will be able to access the other commands.

### Commands

1. add - Adds alerts from the uploaded and processed csv file
2. delete - Deletes all alerts from the account
3. upload-csv - Uploads alerts csv file to the server
4. generate-key - Generates a new public/private key pair and outputs the public key to the console
5. **quit**
