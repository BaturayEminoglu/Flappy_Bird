#pragma strict
 
public var yercekimi : float = 4;
public var ziplamaGucu : float = 2.5;
public var yatayHiz : float = 1.5;
private var dikeyHiz : float = 0;
 
private var oyunBitti : boolean = false;
private var engeleCarptim : boolean = false;
private var kameraUnityEbatlar : Vector2;
private var skor : int = 0;
private var yuksekSkor : int = 0;

public var kanatSes : AudioClip;
public var skorSes : AudioClip;
public var olumSes : AudioClip;
public var dusmeSes : AudioClip;

function Start()
{
    kameraUnityEbatlar = Vector2( Camera.main.orthographicSize * Camera.main.aspect, Camera.main.orthographicSize );
    yuksekSkor = PlayerPrefs.GetInt( "YuksekSkor" );
}
function Update ()
{
    if( !oyunBitti )
    {
        dikeyHiz -= yercekimi * Time.deltaTime;
 
        if( Input.GetMouseButtonDown( 0 ) )
            dikeyHiz = ziplamaGucu;
 
        var egim : float = 90 * dikeyHiz / yatayHiz;
 
        if( egim < -50 ) egim = -50;
        else if( egim > 50 ) egim = 50;
 
        transform.eulerAngles = Vector3( transform.eulerAngles.x,
                        transform.eulerAngles.y, egim );
 
        transform.Translate( 0, dikeyHiz * Time.deltaTime, 0, Space.World );
        transform.parent.Translate( yatayHiz * Time.deltaTime, 0, 0 );
    }
    else
{
    if( Input.GetMouseButtonDown( 0 ) )
        Application.LoadLevel( "Oyun1" );
}
    if( Input.GetMouseButtonDown( 0 ) && !engeleCarptim )
{
    dikeyHiz = ziplamaGucu;
    GetComponent.<AudioSource>().PlayOneShot( kanatSes );
}
    if( transform.position.y > kameraUnityEbatlar.y )
{
    Destroy( Camera.main.GetComponent( ArkaPlan ) );
	Destroy( GetComponent( KusAnime ) );
	yatayHiz = 0;
 
	if( !engeleCarptim )
    EngelOlumSesiCal();
 
	engeleCarptim = true;
}
	if( Input.GetKeyDown( KeyCode.Escape ) )
    Application.Quit();
    
}
 
function OnTriggerEnter2D( temas : Collider2D )
{
    if( temas.tag == "SkorTemasAlani" )
    {
        if( !engeleCarptim && !oyunBitti )
        {
            skor++;
            GetComponent.<AudioSource>().PlayOneShot( skorSes );
        }
    }
    else
    {
        Destroy( Camera.main.GetComponent( ArkaPlan ) );
        Destroy( GetComponent( KusAnime ) );
        yatayHiz = 0;
 
        if( !engeleCarptim )
            EngelOlumSesiCal();
 
        engeleCarptim = true;
    }
}
 
function OnCollisionEnter2D( temas : Collision2D )
{
    Destroy( Camera.main.GetComponent( ArkaPlan ) );
    Destroy( GetComponent( KusAnime ) );
    yatayHiz = 0;
    oyunBitti = true;
 
    if( skor > yuksekSkor )
        yuksekSkor = skor;
 
    PlayerPrefs.SetInt( "YuksekSkor", yuksekSkor );
    PlayerPrefs.Save();
 
    if( !engeleCarptim )
        GetComponent.<AudioSource>().PlayOneShot( olumSes );
}
 
function EngelOlumSesiCal()
{
    GetComponent.<AudioSource>().PlayOneShot( olumSes );
    yield WaitForSeconds( 0.25 );
    GetComponent.<AudioSource>().PlayOneShot( dusmeSes );
}
function OnGUI()
{
    GUI.skin.box.alignment = TextAnchor.UpperRight;
    GUI.skin.box.fontSize = 30;
    GUI.skin.box.fontStyle = FontStyle.Bold;
    GUI.color = Color.green;
    GUILayout.BeginArea( Rect( 0, 25, Screen.width - 25, 200 ) );
    GUILayout.BeginHorizontal();
    GUILayout.FlexibleSpace();
    GUILayout.Box( "SKOR: " + skor + "\nYÜKSEKSKOR: " + yuksekSkor );
    GUILayout.EndHorizontal();
    GUILayout.EndArea();
}