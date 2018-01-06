Once you import the SQL dump into your own MySQL instance
you can run these queries yourself

### All the exercises of all users
- with the outcome of every exercise
- ordered by user in chronological order

Preview of Result: 

		593	2017-06-17 14:12:04	12430	2017-06-17	serre	Correct
		593	2017-06-17 14:12:23	12431	2017-06-17	accusés	Wrong
		593	2017-06-17 14:12:25	12432	2017-06-17	accusés	Wrong
		593	2017-06-17 14:12:26	12433	2017-06-17	accusés	Correct
		593	2017-06-17 14:12:52	12434	2017-06-17	hausse	Correct
		593	2017-06-17 14:13:22	12435	2017-06-17	lutter	Correct		

Query:

		select b.user_id, e.time, e.id as exercise_id,  DATE(e.time), uw.word, eo.`outcome`
		from bookmark b, exercise e, bookmark_exercise_mapping bem, user_word as uw, exercise_outcome as eo
		where
		    bem.`bookmark_id` = b.id and
		    bem.`exercise_id`= e.id and
		    uw.id = b.origin_id and
		    eo.id = e.`outcome_id`
		order by user_id, time

