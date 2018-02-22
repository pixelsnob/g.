
## Bash script for running g.alerts remotely

Only dependencies besides Bash are ssh, ssh-keygen, and scp.

### Commands

1. add - Adds alerts from the uploaded and processed csv file
2. delete - Deletes all alerts from the account
3. upload-csv - Uploads alerts csv file to the server
4. generate-key - Generates a new public/private key pair and outputs the public key to the console

### Windows, without git

1. Open up the "PowerShell" (lol) console
1. [Download this file](https://raw.githubusercontent.com/pixelsnob/g.alerts/master/bin/client/runner) to your home directory
1. In your console type `bash`
1. Navigate to your home directory
1. `chmod 755 runner` in your console
1. Then, `./client`

On first run, you will want to generate a public/private key pair by entering the "generate key" option in the menu. Once the public key is authorized on the server, you will be able to access the other commands.
