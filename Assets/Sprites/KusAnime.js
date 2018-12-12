#pragma strict
 
public var saniyedeKareSayisi : int = 10;
public var animasyonKareleri : Sprite[];
 
private var sonrakiAnimasyonDegismeAni : float;
private var animasyonYonu : boolean = true;
private var mevcutAnimasyonKaresi : int = 0;
 
function Start()
{
    if( animasyonKareleri.Length < 2 )
        Destroy( this );
 
    sonrakiAnimasyonDegismeAni = Time.time + 1f / saniyedeKareSayisi;
}
 
function Update()
{
    if( Time.time >= sonrakiAnimasyonDegismeAni )
    {
        if( animasyonYonu )
        {
            if( mevcutAnimasyonKaresi == animasyonKareleri.Length - 1 )
            {
                mevcutAnimasyonKaresi--;
                animasyonYonu = false;
            }
            else
            {
                mevcutAnimasyonKaresi++;
            }
        }
        else
        {
            if( mevcutAnimasyonKaresi == 0 )
            {
                mevcutAnimasyonKaresi++;
                animasyonYonu = true;
            }
            else
            {
                mevcutAnimasyonKaresi--;
            }
        }
 
        GetComponent( SpriteRenderer ).sprite = animasyonKareleri[ mevcutAnimasyonKaresi ];
        sonrakiAnimasyonDegismeAni = Time.time + 1f / saniyedeKareSayisi;
    }
}
