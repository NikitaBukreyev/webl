<!DOCTYPE html>

<html>
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="styles.css">
		<title>Lab #3. Admin</title>
	</head>
	<body>
		<div class="wrapper">
			<header id="one">
				<section id="x">
					<a href="index.php">
						<h3 id="x_header">Go&nbsp;to&nbsp;view&nbsp;page</h3>
					</a>
				</section>
				<p align="justify" style="position: relative">According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow!</p>
			</header>

			<nav id="two">
				<div style="margin-top: 7em">
				According to all known laws of aviation
				</div>
			</nav>

			<main id="three">
				<p align="justify">Let's shake it up a little. Barry! Breakfast is ready! Ooming! Hang on a second. Hello? - Barry? - Adam? - Oan you believe this is happening? - I can't. I'll pick you up. Looking sharp. Use the stairs. Your father paid good money for those.</p>
			</main>

			<main id="four">
				<div id="fourButtons">
					<a>*ID count starts from 0</a>
					<div>
						<input type="text" id="newText4Slide" placeholder="Slide text">
						<button id="newCarousel" name="newCarousel" type="button" onclick="newCarousel()">Create new carousel</button>
					</div>
					<div>
						<input type="number" id="addCarouselId" placeholder="Carousel ID" min="0">
						<input type="text" id="addText4slide" placeholder="Slide text">
						<button id="addSlide" name="addSlide" type="button" onclick="addSlide()">Add slide to existing carousel</button>
					</div>
					<div>
						<input type="number" id="editCarouselId" placeholder="Carousel ID" min="0">
						<input type="number" id="editSlideId" placeholder="Slide ID" min="0">
						<input type="text" id="editText4slide" placeholder="Slide text">
						<button id="editSlide" name="editSlide" type="button" onclick="editSlide()">Edit slide text</button>
					</div>
					<div>
						<input type="number" id="deleteCarouselId" placeholder="Carousel ID" min="0">
						<input type="number" id="deleteSlideId" placeholder="Slide ID" min="0">
						<button id="deleteSlide" name="deleteSlide" type="button" onclick="deleteSlide()">Delete slide</button>
					</div>
					<div>
						<input type="number" id="carouselId" placeholder="Carousel ID" min="0">
						<button id="deleteCarousel" name="deleteCarousel" type="button" onclick="deleteCarousel()">Delete carousel</button>
					</div>
					<div>
						<button id="saveChanges" name="saveChanges" type="button" onclick="saveChanges()">Save changes</button>
					</div>
				</div>
				<!-- Carousels go here -->
				<?php
				include "config.php";
				$mysqli = new mysqli($data[0], $data[1], $data[2], $data[3]);

				if ($mysqli -> connect_errno) {
					echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
					exit();
				}
				
				if ($carousels = $mysqli -> query("SELECT DISTINCT(carousel_id) FROM config ORDER BY carousel_id")) {
					while ($carousel = $carousels -> fetch_assoc()) {
						$carouselID = $carousel["carousel_id"];
						echo '
						<section class="carousel" aria-label="Gallery">
						<ol class="c_viewport">';
						
						$slideCountQry = $mysqli -> query("SELECT COUNT(slide_id) as slide_ids FROM `config` WHERE carousel_id =" . $carouselID);
						$slideCountAssoc = $slideCountQry -> fetch_assoc();
						$slideCount = $slideCountAssoc["slide_ids"];

						if ($slides = $mysqli -> query("SELECT * FROM `config` WHERE carousel_id =" . strval($carouselID) . " ORDER BY slide_id")) {
							while ($row = $slides -> fetch_assoc()) {
								echo '
								<li id="c' . strval($carouselID) . '_slide' . strval($row["slide_id"]+1) . '" tabindex="0" class="c_slide">
								<a class="s_text">' . $row["slide_text"] . '</a>
								<div class="c_snapper"></div>';

								if ($row["slide_id"] == 0) { // first slide
									$prev = $slideCount;
									$next = $row["slide_id"] + 2;
								} elseif ($slideCount - $row["slide_id"] == 1) { // last slide
									$prev = $row["slide_id"];
									$next = 1;
								} else { // middle slide
									$prev = $row["slide_id"];
									$next = $row["slide_id"] + 2;
								}

								echo '
								<a href="#c' . strval($carouselID) . '_slide' . $prev . '" class="c_prev"></a>
								<a href="#c' . strval($carouselID) . '_slide' . $next . '" class="c_next"></a>
								</li>';
							}
						}
						echo '
						</ol>
						</section>';
						$slideCountQry -> free_result();
						$slides -> free_result();
					}
					$carousels -> free_result();
				}
				$mysqli -> close();
				?>
			</main>

			<aside id="five">
				<p id="five_text" align="justify">Special day, graduation. Never thought I'd make it. Three days grade school, three days high school. Those were awkward. Three days college. I'm glad I took a day and hitchhiked around the hive. You did come back different. - Hi, Barry. - Artie, growing a mustache? Looks good. - Hear about Frankie? - Yeah. - You going to the funeral?</p>
			</aside>

			<footer id="six">
				<artcile id="y">
					<a href="index.php">
						<h4 id="y_header">Go&nbsp;to&nbsp;view&nbsp;page</h4>
					</a>
				</artcile>
			</footer>
		</div>

		<script src="adminScript.js"></script>
	</body>
</html>