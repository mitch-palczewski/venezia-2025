<div>
	<div class="m-3 bg-gray-200 p-5">
		<p>
			10/3/25 - Figured out how to make copys of models utilizing trelte commands
		</p>
	</div>
	<div class="m-3 bg-gray-200 p-5">
		<p>
			10/2/25 - Implemented Large File Storage. 
		</p>
		<p>Uploading large files to github was not working (due
			to the 100mb limit). Luckily Vercel has a free blob storage thingy, which was really easy to
			use. This is where we can store large models and video which is great. AND I was thinking we would
			be unable to have any substantial video. This can now be done. </p>
		<p>There are still a few things to think about. </p>
		<p>- All media but most expecially large files (greater then 100mb) should be as compressed as possible while maintaining reasonable fidelity. </p>
		<p>- If possible files should be under 100mb so they can be hosted on github</p>
		<p>- There is a limit of 1GB for average Storage. The file in demo3 was 200mb which is 1/5th of the storage. But it only says 10.7MB / 1 GB. Not sure if it just needs to update</p>
	</div>
	<div class="m-3 bg-gray-200 p-5">
		<p>10/1/25 - Working on 3D Application structure.</p>
		<p>Some necessary technical mumbo jumbo</p>
		<p>
			For rendering purposes there needs to be a central Canvas where 3d components and scripts are
			contained in a single Canvas. So we are portaling content from the page to a global layout
			that has a Canvas<br /> Page(CanvasPortal(3d Content)) -> CanvasPortalTarget
		</p>
	</div>

	<div class="m-3 bg-gray-200 p-5">
		<p>
			9/29/25 - Chosen to use the Sveltekit framework with packages Threlte and Three to display 3D
			models. The website is stored in github and a hosted with Vercel.
		</p>
	</div>
</div>
