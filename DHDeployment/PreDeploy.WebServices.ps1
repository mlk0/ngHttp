﻿ #####################################################################
 #  Copyright (c) D+H Ltd. 2013
 #
 #  All Rights Reserved
 #
 #  THIS INFORMATION IS COMPANY CONFIDENTIAL
 #
 #  This material is a confidential trade secret and proprietary information of D+H Ltd. which may not be
 #  reproduced, used, sold, or transferred to any third party without the prior written consent of D+H Ltd.
 #
 # ##################################################################

# If there is an error in the script, cause Octopus Deploy to see the error
$ErrorActionPreference = "Stop"
 . ./common_functions.ps1
try {
	# Load log4net
	push-location "$BuildToolsPath\Logging"
	. .\LoggingFunctions.ps1
	pop-location

	log-info "($OctopusEnvironmentName) Web Services deployment for $OctopusProjectName $OctopusReleaseNumber"
	log-info "($OctopusEnvironmentName) Parameters passed in:"
	log-info "($OctopusEnvironmentName) OctopusPackageDirectoryPath $TargetPath"
	log-info "($OctopusEnvironmentName) OctopusOriginalPackageDirectoryPath $OctopusOriginalPackageDirectoryPath"
	log-info "($OctopusEnvironmentName) BuildToolsPath $BuildToolsPath"

} catch {
	write-output "Problem has occurred with the script that may be related to log4net or email setup. Please review Octopus Deploy log."
	throw "Problem has occurred with the script that may be related to log4net or email setup. Please review Octopus Deploy log."
}

try {
	# Stop IIS App Pool
	# Import-Module WebAdministration
	# log-info "($OctopusEnvironmentName) AppPool: $AppPoolName $($(Get-WebAppPoolState -name $AppPoolName).value)"

	# if ($(Get-WebAppPoolState -name $AppPoolName).value -eq 'Started') {
		# log-info "($OctopusEnvironmentName) Stop $AppPoolName"
		# Stop-WebAppPool -Name $AppPoolName
		# log-info "($OctopusEnvironmentName) AppPool: $AppPoolName $($(Get-WebAppPoolState -name $AppPoolName).value)"

		# #wait 5 secs if app pool is still being stopped
		# while ($(Get-WebAppPoolState -name $AppPoolName).value -ne 'Stopped') {
			# log-info "($OctopusEnvironmentName) Waiting 5 seconds for app pool to stop"
			# start-sleep -s 5
		# }
		# log-info "($OctopusEnvironmentName) AppPool: $AppPoolName $($(Get-WebAppPoolState -name $AppPoolName).value)"

	# }elseif($($(Get-WebAppPoolState -name $AppPoolName).value) -ne 'Stopped'){
		# throw "$AppPoolName does not exist"
	# }

	# Reset properties to normal for all sbu folders/files and purge later
	if (Test-Path $TargetPath) {
        log-info "($OctopusEnvironmentName) The directory $TargetPath exists. Purging it. Excluding log folder from purge."
        Purge-TargetPath $TargetPath -exclude "log"
	} else {
		log-error "($OctopusEnvironmentName) $TargetPath does not exist! Please verify that the service is properly setup."
		Notify "$TargetPath does not exist! Please verify that the service is properly setup."
		throw "$TargetPath does not exist! Please verify that the service is properly setup."
	}

	# Update Config Settings
	$UpdateConfigScript=$OctopusOriginalPackageDirectoryPath + "\UpdateConfigurationFiles.ps1"
	. $UpdateConfigScript
	
	if($?){
	log-info "($OctopusEnvironmentName) Update Config File Completed."
	}else{
		log-error "($OctopusEnvironmentName) Unable to update config file. See logs "
		throw "($OctopusEnvironmentName) Unable to update config file. See logs "
	}
	
	# Copy
	log-info "($OctopusEnvironmentName) Copy files."
	Robocopy $OctopusOriginalPackageDirectoryPath $TargetPath /E /NFL /NDL /NJS /NJH /XF PreDeploy.ps1 UpdateConfigurationFiles.ps1 common_functions.ps1

	# Start IIS App Pool
	# log-info "($OctopusEnvironmentName) Restarting App pool"
	# if ($(Get-WebAppPoolState -name $AppPoolName).value -eq 'Stopped') {
		# log-info "($OctopusEnvironmentName) Start $AppPoolName"
		# Start-WebAppPool -Name $AppPoolName
		# log-info "($OctopusEnvironmentName) AppPool: $AppPoolName $($(Get-WebAppPoolState -name $AppPoolName).value)"
	# }
	exit 0

} catch {
	log-error "($OctopusEnvironmentName) Catch: Deployment script failure! Please check Octopus log for details."
	log-error "($OctopusEnvironmentName) $($_.Exception.Message)"
	log-error "($OctopusEnvironmentName) $($_.InvocationInfo.PositionMessage)"
	$DeployLink = "<p> <BR><H3>Octopus Deployment Link</H3> <table> <tr> <td>$($OctopusSvrURL)/app#/projects/$($OctopusParameters["Octopus.Project.Name"])/releases/$($OctopusParameters["Octopus.Release.Number"])/deployments/$($OctopusParameters["Octopus.Deployment.Id"])</td> </tr> </table> </p>".Replace("_","-")
	$Body = "<style> $CSS </style>" + "<body>"
	$Body += "<H1>The deployment of the $OctopusPackageName nuget package has failed.</H1>"
	$Body += "<BR> Error(s) found: <BR>$($_.Exception.Message) <BR> $($_.InvocationInfo.PositionMessage)".Replace("`n","<BR>").Replace("`r","").Replace("<BR><BR><BR>","<BR><BR>").Replace(" ","&nbsp;")
	$Body += "$DeployLink" + " </body>"
	Notify "$Body"
	throw "$($_.Exception.Message)"
}
