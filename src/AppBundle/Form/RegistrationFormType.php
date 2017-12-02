<?php
/**
 * Created by PhpStorm.
 * User: kkraujelis
 * Date: 11/6/17
 * Time: 11:53 PM
 */

namespace AppBundle\Form;

use FOS\UserBundle\Form\Type\RegistrationFormType as BaseFormType;
use Symfony\Component\Form\FormBuilderInterface;

class RegistrationFormType extends BaseFormType
{

    public function buildForm(FormBuilderInterface $builder, array $options) : void
    {
        parent::buildForm($builder, $options);

        $builder->remove('username');

        $builder->add('firstName');
        $builder->add('lastName');
    }
}
