### All the exercises that all the users did
- ordered by user in chronological order
- also with the outcomes of every exercises

select b.user_id, e.time, e.id as exercise_id,  DATE(e.time), uw.word, eo.`outcome`
from bookmark b, exercise e, bookmark_exercise_mapping bem, user_word as uw, exercise_outcome as eo
where
    bem.`bookmark_id` = b.id and
    bem.`exercise_id`= e.id and
    uw.id = b.origin_id and
    eo.id = e.`outcome_id`
order by user_id, time