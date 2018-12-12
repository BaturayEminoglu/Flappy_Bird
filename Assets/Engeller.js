#pragma strict
 
public var ustEngel : GameObject;
public var altEngel : GameObject;
 
public var altUstEngelArasiBosluk : float = 0.8;
public var ikiEngelArasiMesafe : float = 2;
 
private var engelSayisi : int;
 
private var kameraUnityEbatlar : Vector2;
private var engelUnityEbatlar : Vector2;
 
private var ustEngelObjeleri : Transform[];
private var altEngelObjeleri : Transform[];
private var bastakiEngelObjesi : int = 0;

public var skorCollider : GameObject;
 
function Start()
{
    engelUnityEbatlar = Vector2( ( ustEngel.GetComponent.<Renderer>() as SpriteRenderer ).sprite.rect.width, ( ustEngel.GetComponent.<Renderer>() as SpriteRenderer ).sprite.rect.height ) / 100;
    kameraUnityEbatlar = Vector2( GetComponent.<Camera>().orthographicSize * GetComponent.<Camera>().aspect, GetComponent.<Camera>().orthographicSize );
 
    engelSayisi = Mathf.CeilToInt( ( GetComponent.<Camera>().orthographicSize * 2 * GetComponent.<Camera>().aspect ) / ( engelUnityEbatlar.x + ikiEngelArasiMesafe ) ) + 1;
 
    ustEngelObjeleri = new Transform[ engelSayisi ];
    altEngelObjeleri = new Transform[ engelSayisi ];
 
    for( var i = 0; i < engelSayisi; i++ )
    {
        var xKoordinati : float = transform.position.x + kameraUnityEbatlar.x + i * ( engelUnityEbatlar.x + ikiEngelArasiMesafe );
        var yKoordinati : float = Random.Range( -kameraUnityEbatlar.y + altUstEngelArasiBosluk + 0.6, kameraUnityEbatlar.y - 0.6 );
        ustEngelObjeleri[i] = Instantiate( ustEngel, Vector3( xKoordinati, yKoordinati, 0 ), Quaternion.identity ).GetComponent( Transform );
        altEngelObjeleri[i] = Instantiate( altEngel, Vector3( xKoordinati, yKoordinati - altUstEngelArasiBosluk, 0 ), Quaternion.identity ).GetComponent( Transform );
    	
    	var temasAlani : EdgeCollider2D = Instantiate( skorCollider, Vector3( xKoordinati + engelUnityEbatlar.x / 2, kameraUnityEbatlar.y, 0 ), Quaternion.identity ).GetComponent( EdgeCollider2D );
    	var cizgi : Vector2[] = new Vector2[2];
    	cizgi[0] = Vector2( 0, 0 );
    	cizgi[1] = Vector2( 0, -2 * kameraUnityEbatlar.y );
    	temasAlani.points = cizgi;
    	temasAlani.transform.parent = ustEngelObjeleri[i];
    }
}
 
function Update()
{
    if( transform.position.x - kameraUnityEbatlar.x >= ustEngelObjeleri[bastakiEngelObjesi].position.x + engelUnityEbatlar.x )
    {
        var yKoordinati : float = Random.Range( -kameraUnityEbatlar.y + altUstEngelArasiBosluk + 0.6, kameraUnityEbatlar.y - 0.6 );
 
        ustEngelObjeleri[bastakiEngelObjesi].position.x += engelSayisi * ( engelUnityEbatlar.x + ikiEngelArasiMesafe );
        altEngelObjeleri[bastakiEngelObjesi].position.x += engelSayisi * ( engelUnityEbatlar.x + ikiEngelArasiMesafe );
 
        ustEngelObjeleri[bastakiEngelObjesi].position.y = yKoordinati;
        altEngelObjeleri[bastakiEngelObjesi].position.y = yKoordinati - altUstEngelArasiBosluk;
 
        bastakiEngelObjesi++;
 
        if( bastakiEngelObjesi == ustEngelObjeleri.Length )
            bastakiEngelObjesi = 0;
    }
}