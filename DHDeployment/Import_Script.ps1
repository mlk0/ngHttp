
 . ./common_functions.ps1
Param( 
        [string]$server = "IDDB-DM13-TOR,1558", 
        [string]$db_name = "DHES",
        [string]$security = "True"
)

[string]$content_export_DS="data source=$server;initial catalog= $db_name;integrated security=$security"
[string]$log

if (Test-Path Content) {
           $log = $(./cmstool.exe -importpages "Content" -verbose -connstr $content_export_DS)
           if ($log -match "Error Thrown At") {
               log-error "importpages failed"  
               throw "$log"
           }
           write-output "importpages passed"
           $log = $(./cmstool.exe -importlabels "Content" -verbose -connstr $content_export_DS)
           if ($log -match "Error Thrown At") {
                 log-error "importlabels failed"
                 throw "$log"
           }
           write-output "importpages passed"
           $log = $(./cmstool.exe -import "Content" -verbose -connstr $content_export_DS)
           if ($log -match "Error Thrown At") {
                 log-error "import failed"
                 throw "$log"
           }
           write-output "importpages passed"
}
Else {
        log-error "Path $(pwd)\Content does not exist"
        throw "Path $(pwd)\Content does not exist"
}
   

 