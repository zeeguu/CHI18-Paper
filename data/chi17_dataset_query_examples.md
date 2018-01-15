Once you import the SQL dump into your own MySQL instance
you can run these queries yourself

### All the exercises of all users
- with the outcome of every exercise
- ordered by user in chronological order

Query:

		select b.user_id, e.time, e.id as exercise_id,  DATE(e.time), uw.word, eo.outcome
		from 
			bookmark b, 
			exercise e, 
			bookmark_exercise_mapping bem, 
			user_word as uw, 
			exercise_outcome as eo
		where
		    bem.bookmark_id = b.id and
		    bem.exercise_id= e.id and
		    uw.id = b.origin_id and
		    eo.id = e.outcome_id
		order by user_id, time

Preview of Result: 

		593	2017-06-17 14:12:26	12433	2017-06-17	accusés	Correct
		593	2017-06-17 14:12:52	12434	2017-06-17	hausse	Correct
		593	2017-06-17 14:13:22	12435	2017-06-17	lutter	Correct
		593	2017-06-17 14:14:01	12437	2017-06-17	empêcher	Correct



### The number of translations all the users

		select count(*)
		from user_activity_data
		where event="UMR - TRANSLATE TEXT"



### The number of articles each user reads

		select q.user_id, count(title)
		from 
			(
				select user_id, url.title, domain_name.domain_name, bookmark.time
				from 
					bookmark, 
					text, 
					url, 
					domain_name
				where 
					text.id = text_id
					and url.id = url_id
					and domain_name.id = domain_name_id
				group by url.title
				order by bookmark.time) as q

		group by q.user_id




### The number of distinct days each user used the system


		select a.user_id, a.login_days
		from 
			(select user_id, count(all_together.date) as login_days
			from 
				(
					-- days when doing exercises
					select distinct user_id, DATE(e.time) as date
							from 
								bookmark b, 
								exercise e, 
								bookmark_exercise_mapping bem, 
								user_word as uw, 
								exercise_outcome as eo
							where
							    bem.bookmark_id = b.id and
							    bem.exercise_id= e.id and
							    uw.id = b.origin_id and
							    eo.id = e.outcome_id

					union

					-- days when doing exercises
					select distinct user_id, DATE(b.time) as date
							from bookmark b
							
							) as all_together
				
				group by all_together.user_id) a

### Exercise details ordered by user chronologically

		select exercise.id, bookmark.user_id,  user.name, bookmark.id, uw.word, outcome, exercise.time, exercise.solving_speed
		from exercise, 
			exercise_outcome, 
			bookmark, 
			bookmark_exercise_mapping, 
			user,
			user_word uw
		where 
			exercise.outcome_id = exercise_outcome.id and
			bookmark_exercise_mapping.exercise_id = exercise.id and 
			bookmark_exercise_mapping.bookmark_id = bookmark.id and
			uw.id = bookmark.origin_id and
			bookmark.user_id = user.id 
		order by name, time


### Users, Their Learned Language, and Number of Read Articles
select *
from
(	select q.user_id, q.learned_language_id, count(title) as articles
	from 
		(
			select user_id, learned_language_id, url.title, domain_name.domain_name, bookmark.time
			from 
				bookmark, 
				text, 
				url, 
				domain_name,
				user
			where 
				text.id = text_id
				and user.id = user_id
				and url.id = url_id
				and domain_name.id = domain_name_id
			group by url.title
			order by bookmark.time) as q
	
	group by q.user_id) x

	where x.articles > 5
	order by learned_language_id


