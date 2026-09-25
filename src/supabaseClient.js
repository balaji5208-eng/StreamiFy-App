import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eyqdrfuaosfurforednb.supabase.co';
const supabaseKey = 'sb_publishable_8ETPzZpZJ0l0Fb-TLY-O5g_kNI_q_ft';

export const supabase = createClient(supabaseUrl, supabaseKey);
