<div>
	<div class="m-3 bg-gray-200 p-5">
		<p>
			10/26/25 - A few notes on Network Pile ... The model interaction e.g. the double click on Zardoz_01 comes with some constraints (although deeper research may solve these). 
			<br>
			** The canvas must be the full screen. When i portal content to a div container I lose interactivity. There is probably a way to do it but its not obvious. 
			<br> 
			<br>
			Some Other things to think about ... 
			<br>
			What are things successful and unsuccessful about the first iterations of pile? 
			<br>
			Is there a HUD what does it look like what does it do? 
			<br>
			Is there a base terrain that is not movable? 
			<br>
			Is there a way to add more objects to the scene ... piling? (comes with technical challenges.)
			<br> 
			lighting generally. Lighting that reflects a locations day night cycle could be cool. 
		</p>
		
	</div>
	<div class="m-3 bg-gray-200 p-5">
		<p>
			10/25/25 - I have been working on a the networking for a multiplayer pile. In short
			+page.server.ts handles the put and get requests. Then data must flow though the page and into
			the component and then back up. Attached is a rough diagram of whats going on.
			<br />
			Next up is builting the editable environments which may be more challenging then I thought.
			<br />
			TODO:
			<br />
			pileState.svelte.ts -- Keeps track of the selected model and controls data and states
			<br />
			model states -- Models can be in a transformable state or static state and need to be able to be
			switched back and forth. Ideally onclick swap state. This may require some interesting wrappers.

		</p>
		<img class="h-[80vh] p-1" src="/images/dev-log/pile-routing.png" alt="Sketch1" />
	</div>
	<div class="m-3 bg-gray-200 p-5">
		<p>
			10/20/25 - VERY IMPORTANT if you want a button or interactive base html to work it needs to be
			wrapped in a div with class="relative"
		</p>
	</div>
	<div class="m-3 bg-gray-200 p-5">
		<p>
			10/16/25 - Looking for a solution to having multiple cameras. I think this is the wrong way to
			think about it. the camera should just move to a different postion.
		</p>
		<img class="h-[80vh] p-1" src="/images/dev-log/sketch1.jpeg" alt="Sketch1" />
		<img class="h-[68vh] p-1" src="/images/dev-log/sketch2.jpeg" alt="Sketch2" />
	</div>
	<div class="m-3 bg-gray-200 p-5">
		<p>
			The human eye observes the local world in ritch 3D and the distenced world such as that
			through a window in flattened 2D. The Computer world is opposite. The Natural Landscape is 2D
			and only through rare and special windows can the world be seen in 3D.
		</p>
		<img class="h-[68vh] p-1" src="/images/dev-log/sketch3.jpg" alt="Sketch3" />
	</div>
	<div class="m-3 bg-gray-200 p-5">
		<p>10/3/25 - Figured out how to make copys of models utilizing trelte commands</p>
	</div>
	<div class="m-3 bg-gray-200 p-5">
		<p>10/2/25 - Implemented Large File Storage.</p>
		<p>
			Uploading large files to github was not working (due to the 100mb limit). Luckily Vercel has a
			free blob storage thingy, which was really easy to use. This is where we can store large
			models and video which is great. AND I was thinking we would be unable to have any substantial
			video. This can now be done.
		</p>
		<p>There are still a few things to think about.</p>
		<p>
			- All media but most expecially large files (greater then 100mb) should be as compressed as
			possible while maintaining reasonable fidelity.
		</p>
		<p>- If possible files should be under 100mb so they can be hosted on github</p>
		<p>
			- There is a limit of 1GB for average Storage. The file in demo3 was 200mb which is 1/5th of
			the storage. But it only says 10.7MB / 1 GB. Not sure if it just needs to update
		</p>
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
